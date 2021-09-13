module.exports = {
    base: '/doc-next/',
    title: 'web规范',
    lang: 'zh-CN',
    description: 'DINGDANG前端规范.',
    themeConfig: {
        repo: 'anncwb/vue-vben-admin',
        docsRepo: 'anncwb/vue-vben-admin-doc',
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
                    text: '指南',
                    link: '/guide/introduction',
                },
                {
                    text: '深入',
                    link: '/dep/icon',
                },
                {
                    text: '其他',
                    link: '/other/faq',
                },
            ],
        },
    ];
}

function createSidebar() {
    return {
        '/': [
            {
                text: '指南',
                children: [
                    {
                        text: '介绍',
                        link: '/guide/introduction',
                    },
                ],
            },
        ],
    };
}
