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
            link: '/guide/namingRule',
            // items: [
            //     {
            //         text: 'web规范',
            //         link: '/guide/namingRule',
            //     }
            // ],
        },
        {
            text: 'UI规范',
            link: '/guide/namingRule',
            items: [
                {
                    text: '钉铛后台系统规范',
                    link: 'http://localhost:3100/public/钉铛后台系统规范.pdf',
                },
                {
                    text: '钉铛科技移动端规范',
                    link: 'http://localhost:3100/public/钉铛科技移动端规范.pdf',
                }
            ],
        },
        {
            text: '笔记',
            link: '/minute/vue/slots',
        },
    ];
}

function createSidebar() {
    return {
        '/minute/': [
            {
                text: 'Vue',
                children: [
                    {
                        text: 'vue',
                        link: '/minute/vue/slots',
                    },
                ],
            },
            {
                text: 'React',
                children: [
                    {
                        text: 'react',
                        link: '/minute/react/index',
                    },
                ],
            },
            {
                text: 'JS',
                children: [
                    {
                        text: '逻辑操作符',
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
            },
            {
                text: 'CSS',
                children: [
                    {
                        text: 'css',
                        link: '/minute/css/index',
                    },
                ],
            },
            {
                text: 'HTML',
                children: [
                    {
                        text: 'heml',
                        link: '/minute/heml/index',
                    },
                ],
            },
            {
                text: 'npm',
                children: [
                    {
                        text: 'npm',
                        link: '/minute/npm/index',
                    },
                ],
            },
            {
                text: 'Node',
                children: [
                    {
                        text: 'node',
                        link: '/minute/node/index',
                    },
                ],
            },
        ],
        '/': [
            {
                text: 'web规范',
                children: [
                    {
                        text: '命名规范',
                        link: '/guide/namingRule',
                    },
                    {
                      text:'HTML 规范',
                      link: '/guide/htmlRule',
                    },
                    {
                      text:'CSS 规范',
                      link: '/guide/CssRule',
                    },
                    {
                      text:'LESS 规范',
                      link: '/guide/LessRule',
                    },
                    {
                      text:'Javascript 规范',
                      link: '/guide/JsRule',
                    },
                    {
                      text:'Vue 规范',
                      link: '/guide/VueRule',
                    }
                ],
            },
        ],
      
    };
}
