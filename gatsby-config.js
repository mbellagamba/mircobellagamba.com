module.exports = {
  siteMetadata: {
    title: `Mirco Bellagamba`,
    author: {
      name: `Mirco Bellagamba`,
      email: `mirco.bellag@gmail.com`,
      role: `Software engineer`,
      summary: `He is a software engineer, living in Ancona (Italy), building high performance, interactive applications, using web technologies. Front-end and app engineer at Madisoft. He builds software for humans.`,
      bio:
        "I am an experienced web and mobile engineer with a broad development background from JavaScript to C#. " +
        "I have worked with front-end web development, distributed systems, mobile apps and cloud environments. " +
        "My greatest interest is software architectures and how to build software that is easy to evolve, scale and maintain. " +
        "This passion has led me to experiment several technologies, development methodologies and to improve my decision making skills.",
    },
    description: `Mirco Bellagamba builds high performance, interactive applications, using web technologies. Front-end and app engineer at Madisoft. He builds software for humans.`,
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
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
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
    `gatsby-plugin-dark-mode`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ["G-W2E9LR5DLD"],
      },
    },
  ],
}
