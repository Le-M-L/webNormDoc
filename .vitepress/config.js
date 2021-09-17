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
            text: '笔记',
            link: '/minute/vue/index',
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
                        link: '/minute/vue/index',
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
