import { defineConfig } from 'vite';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import path from 'path';
import fg from 'fast-glob';
import { fileURLToPath } from 'url';
import pretty from 'pretty';
import { readFileSync, writeFileSync } from 'fs';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    plugins: [
        ViteEjsPlugin({
            data: {
                title: 'Team DNA(Vanilla)',
                description: 'Vanilla Base Development Navigation Architecture',
            },
        }),
        {
            name: 'html-formatter',
            apply: 'build', // 빌드 단계에서만 실행
            writeBundle() {
                const files = fg.sync(['dist/**/*.html']);
                files.forEach((file) => {
                    let content = readFileSync(file, 'utf-8');
                    if (!/<head>/i.test(content)) {
                        content = content.replace(/<link\s+rel=["']stylesheet["'][^>]*>/gi, '');
                    }
                    const formatted = pretty(content, { ocd: true });
                    writeFileSync(file, formatted, 'utf-8');
                });
            },
        },
    ],
    // css: {
    //     preprocessorOptions: {
    //         scss: {
    //             additionalData: `@use '/src/assets/css/_custom_var' as *;`,
    //         },
    //     },
    // },
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        cssCodeSplit: false,
        minify: false,
        assetsInlineLimit: 0,
        rollupOptions: {
            preserveModules: true, // 모듈 구조 유지
            input: Object.fromEntries(
                fg.sync(['./index.html', './src/**/*.html']).map((file) => [
                    path
                        .relative('.', file)
                        .replace(/\.html$/, '')
                        .replace(/\//g, '-'),
                    path.resolve(__dirname, file),
                ])
            ),
            output: {
                manualChunks: undefined, // 추가적인 번들링 최적화 방지
                entryFileNames: (chunkInfo) => {
                    // 원래 폴더 구조를 유지하여 js 폴더에 저장
                    const name = chunkInfo.name;
                    return `assets/js/${name}.js`;
                },
                chunkFileNames: (chunkInfo) => {
                    // 청크 파일도 js 폴더 내에 저장
                    const name = chunkInfo.name;
                    return `assets/js/${name}.js`;
                },
                assetFileNames: (assetInfo) => {
                    if (/\.css$/.test(assetInfo.name ?? '')) {
                        return 'assets/css/index.css';
                    }
                    if (/\.(png|jpe?g|gif|svg|webp)$/i.test(assetInfo.name)) {
                        return 'assets/images/[name].[extname]'; // 이미지를 assets/images/ 폴더로 저장
                    }
                    if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
                        return 'assets/fonts/[name].[extname]'; // 폰트를 assets/fonts/ 폴더로 저장
                    }
                    return 'assets/other/[name].[extname]'; // 기타 자산은 assets/other/ 폴더로 저장
                },
            },
        },
    },
    publicDir: 'public',
    server: {
        port: 6001,
        strictPort: true,
        onListening: (server) => {
            const address = server.address();
            if (address && typeof address === 'object') {
                const port = address.port;
                if (port !== 6001) {
                    // eslint-disable-next-line no-undef
                    console.error(
                        `Error: The server is running on an unexpected port: ${port}. Expected port: 6001.`
                    );
                }
            }
        },
        middleware: (req, res, next) => {
            if (req.headers['user-agent']?.includes('Live Server')) {
                res.statusCode = 500;
                res.end('Error: Live Server는 지원되지 않습니다. 개발을 위해 Vite를 사용하세요.');
            } else {
                next();
            }
        },
    },
});
