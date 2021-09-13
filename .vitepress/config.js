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
            text: '指南',
            link: '/guide/',
            items: [
                {
                    text: 'web规范',
                    link: '/guide/namingRule',
                },
            ],
        },
    ];
}

function createSidebar() {
    return {
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
