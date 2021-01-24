module.exports = {
  flags: {
    DEV_SSR: false,
  },
  siteMetadata: {
    title: `Mirco Bellagamba`,
    author: {
      name: `Mirco Bellagamba`,
      email: `mirco.bellag@gmail.com`,
      role: `Software engineer`,
      summary: `is a software engineer, living in Ancona (Italy), dealing with frontend web development and mobile applications.`,
      bio:
        "I am an experienced web and mobile engineer with a broad development background from JavaScript to C#. " +
        "I have worked with front-end web development, distributed systems, mobile apps and cloud environments. " +
        "My greatest interest is software architectures and how to build software that is easy to evolve, scale and maintain. " +
        "This passion has led me to experiment several technologies, development methodologies and to improve my decision making skills.",
    },
    description: `Mirco Bellagamba is a software engineer dealing with frontend web development and mobile applications. Software architectures, modern web technologies, microservices are some of the IT topics he is most interested in.`,
    siteUrl: `https://mircobellagamba.com/`,
    keywords: [
      "mirco bellagamba",
      "software engineer",
      "web developer",
      "app developer",
    ],
    social: {
      twitter: `mircoBellaG`,
      linkedin: `mirco-bellagamba`,
      github: `mbellagamba`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/works`,
        name: `works`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Mirco Bellagamba Website`,
        short_name: `Mirco Bellagamba`,
        start_url: `/`,
        background_color: `#000000`,
        theme_color: `#ffffff`,
        display: `minimal-ui`,
        icon: `content/assets/mb-icon.png`,
        icon_options: {
          purpose: `maskable`,
        },
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ["G-W2E9LR5DLD"],
      },
    },
  ],
}
