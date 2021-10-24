module.exports = {
    base: '/',
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
    return [
        {
            text: 'web规范',
            link: '/guide/webRule',
            // items: [
            //     {
            //         text: 'web规范',
            //         link: '/guide/namingRule',
            //     }
            // ],
        },
        {
            text: 'UI规范',
            link: '/guide/',
            items: [
                {
                    text: '钉铛后台系统规范',
                    link: 'http://localhost:3100/public/钉铛后台系统规范.pdf',
                },
                {
                    text: '钉铛科技移动端规范',
                    link: 'http://localhost:3100/public/钉铛科技移动端规范.pdf',
                },
                {
                    text: '钉铛科技前端开发规范',
                    link: '/guide/webRule',
                },
            ],
        },
        {
            text: '笔记',
            link: '/minute/',
            items: [
                {
                    text: 'Vue',
                    link: '/minute/vue/index',
                },
                {
                    text: 'React',
                    link: '/minute/react/index',
                },
                {
                    text: 'Js',
                    link: '/minute/js/index',
                },
                {
                    text: 'Css',
                    link: '/minute/css/index',
                },
                {
                    text: 'Html',
                    link: '/minute/html/index',
                },
                {
                    text: 'Npm',
                    link: '/minute/npm/index',
                },
                {
                    text: 'Node',
                    link: '/minute/node/index',
                },
            ],
        },
    ];
}

function createSidebar() {
    return {
        '/minute/vue/': [
            {
                text: 'vue',
                link: '/minute/vue/index',
            },
        ],
        '/minute/react/': [
            {
                text: 'React',
                link: '/minute/react/index',
            },
        ],
        '/minute/js/': [
            {
                text: 'Js',
                link: '/minute/js/index',
            },
            {
                text: 'call、apply 和 bind',
                link: '/minute/js/call',
            },
            {
                text: 'import 和 export',
                link: '/minute/js/export',
            },
        ],
        '/minute/css/': [
            {
                text: 'Css',
                link: '/minute/css/index',
            },
        ],
        '/minute/html/': [
            {
                text: 'Html',
                link: '/minute/html/index',
            },
        ],
        '/minute/npm/': [
            {
                text: 'Npm',
                link: '/minute/npm/index',
            },
        ],
        '/minute/node/': [
            {
                text: 'Node',
                link: '/minute/node/index',
            },
        ],
        '/minute/':[
            {
                text:'mac'
            }
        ],
        // '/guide/webRule':[
        //     {
        //         text:'钉铛科技前端开发规范',
        //         link:'/guide/webRule'
        //     }
        // ],
        '/': [
            {
                text: 'web规范',
                children: [
                    {
                        text: '钉铛科技前端开发规范',
                        link: '/guide/webRule',
                    },
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
