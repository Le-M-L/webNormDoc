module.exports = {
    base: '/doc',
    title: 'web规范',
    lang: 'zh-CN',
    description: 'DINGDANG前端规范.',
    themeConfig: {
        repo: '',
        docsRepo: 'Le-M-L/webNormDoc',
        logo: '/logo.svg',
        docsBranch: 'main',
        editLinks: true,
        nav: createNav(),
        sidebar: createSidebar(),
    },
};

function createNav() {
    let nav = ['vue', 'react', 'js', 'ts', 'css', 'html', 'node', 'java', 'nginx', 'linux', 'vite', 'webpack', 'plugin'];
    return [
        // {
        //     text: 'web规范',
        //     link: '/guide/webRule',

        // },
        // {
        //     text: 'UI规范',
        //     link: '/guide/',
        //     items: [
        //         {
        //             text: '钉铛后台系统规范',
        //             link: 'http://116.62.122.54:8090/钉铛后台系统规范.pdf',
        //         },
        //         {
        //             text: '钉铛科技移动端规范',
        //             link: 'http://116.62.122.54:8090/钉铛科技移动端规范.pdf',
        //         },
        //         {
        //             text: '钉铛科技前端开发规范',
        //             link: '/guide/webRule',
        //         },
        //     ],
        // },
        ...nav.map((item) => ({
            text: item,
            link: `/minute/${item}/${item}`,
        })),
     
        {
            text: 'Mac相关',
            link: '/minute/homebrew/homebrew',
        },
        {
            text: '面试题',
            link: '/hmilyl/Vue',
        },
    ];
}

function createSidebar() {
    return {
        '/minute/vue/': [
            {
                text: 'vue',
                link: '/minute/vue/vue',
            },
        ],

        '/minute/react/': [
            {
                text: 'React',
                link: '/minute/react/react',
            },
        ],
        '/minute/js/': [
            {
                text: 'Js',
                link: '/minute/js/js',
            },
            {
                text: 'call、apply 和 bind',
                link: '/minute/js/call',
            },
            {
                text: 'import 和 export',
                link: '/minute/js/export',
            },
            {
                text: 'FileEeader',
                link: '/minute/js/FileReader',
            },
        ],
        '/minute/ts/': [
            {
                text: 'TS笔记',
                link: '/minute/ts/ts',
            },
        ],
        '/minute/css/': [
            {
                text: 'Css',
                link: '/minute/css/css',
            },
        ],
        '/minute/html/': [
            {
                text: 'Html',
                link: '/minute/html/html',
            },
        ],
        '/minute/npm/': [
            {
                text: 'Npm',
                link: '/minute/npm/npm',
            },
        ],
        '/minute/node/': [
            {
                text: 'Node',
                link: '/minute/node/node',
            },
            {
                text: 'nest',
                link: '/minute/node/nest',
            },
            {
                text: 'egg',
                link: '/minute/node/egg',
            },
        ],
        '/minute/homebrew': [
            {
                text: 'Homebrew',
                link: '/minute/homebrew/homebrew',
            },
        ],
        '/minute/java': [
            {
                text: 'Java',
                link: '/minute/java/java',
            },
        ],
        '/minute/nginx': [
            {
                text: 'Nginx',
                link: '/minute/nginx/nginx',
            },
        ],
        '/minute/linux': [
            {
                text: 'linux',
                link: '/minute/linux/linux',
            },
        ],
        '/minute/vite/': [
            {
                text: 'Vite',
                link: '/minute/vite/vite',
            },
        ],
        '/minute/webpack/': [
            {
                text: 'Webpack',
                link: '/minute/webpack/webpack',
            },
        ],
        '/minute/plugin/': [
            {
                text: '插件',
                link: '/minute/plugin/plugin',
            },
        ],
        // '/guide/webRule':[
        //     {
        //         text:'钉铛科技前端开发规范',
        //         link:'/guide/webRule'
        //     }
        // ],
        '/hmilyl': [
            {
                text: '面试题',
                children: [
                    {
                        text: 'HTML相关',
                        link: '/hmilyl/Html',
                    },
                    {
                        text: 'CSS相关',
                        link: '/hmilyl/Css',
                    },
                    {
                        text: 'JS相关',
                        link: '/hmilyl/Js',
                    },
                    {
                        text: 'Vue相关',
                        link: '/hmilyl/Vue',
                    },
                    {
                        text: 'React相关',
                        link: '/hmilyl/React',
                    },
                ],
            },
        ],
        '/': [
            {
                text: 'web规范',
                children: [
                    // {
                    //     text: '前端开发规范',
                    //     link: '/guide/webRule',
                    // },
                    // {
                    //     text: 'git提交规范',
                    //     link: '/guide/Git',
                    // },
                    // {
                    //     text: 'HTML 规范',
                    //     link: '/guide/htmlRule',
                    // },
                    // {
                    //     text: 'CSS 规范',
                    //     link: '/guide/CssRule',
                    // },
                    // {
                    //     text: 'LESS 规范',
                    //     link: '/guide/LessRule',
                    // },
                    // {
                    //     text: 'Javascript 规范',
                    //     link: '/guide/JsRule',
                    // },
                    // {
                    //     text: 'Vue 规范',
                    //     link: '/guide/VueRule',
                    // },
                ],
            },
        ],
    };
}
