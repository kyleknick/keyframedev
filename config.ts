const siteMetadata = {
    title: `Keyframe Development`,
    siteUrl: `http://keyframedev.com`,
    capitalizeTitleOnHome: false,
    logo: `/images/logo.png`,
    icon: `/images/logo.png`,
    titleImage: `/images/conifer-18.png`,
    ogImage: `/images/cconifer-18.png`,
    twoColumnWall: true,
    cookiePolicy: true,
    introTag: `Smoothly transitioning digital projects from idea to reality.`,
    description: ` At Keyframe Studio, we'll work with you to deliver digital projects that are fast, responsive, and cost-effective. Our expertise includes Web and Mobile Development, Fullstack, Wordpress and more`,
    about: "We are a software development studio located in Austin, TX.  Our mission for any project we work on is to deliver industry-leading results at budget-friendly costs and time.  We are trained in many of the tools and resources that are out there to help build digital products more efficiently.  Utilizing this expertise we can help businesses succeed the digital space and offer many different web services to assist our clients in acheiving their goals.",
    author: `@kyleknick`,
    blogItemsPerPage: 10,
    portfolioItemsPerPage: 10,
    darkmode: true,
    switchTheme: true,
    navLinks: [
        {
            name: "HOME",
            url: "/",
        },
        {
            name: "ABOUT",
            url: "/about",
        },
        {
            name: "CONTACT",
            url: "/contact",
        },
    ],
    footerLinks: [
        {
            name: "PRIVACY POLICY",
            url: "/privacy-policy",
        },
        {
            name: "GitHub",
            url: "https://github.com/kyleknick/keyframedev",
        },
    ],
    contact: {
        // leave empty ('') or false to hide form
        api_url: "https://getform.io/f/b30169dd-0e15-4500-8090-e5478106253a",
        description: `Have an idea that you need help getting started? Please reach out to us today and we'll get back to you to discuss your project promptly.`,
        mail: "contact@keyframedev.com",
        phone: "512-298-9356",
        address: "Austin, Texas",
    },
    disqus: "elemental-netlify-com",
}

const beforeContactFormSubmit = data => {
    // Code 0 - success
    // Code 1 - Name
    // Code 2 - Email
    // Code 3 - Message
    // Code 4 - Other
    const errors = []

    if (data.name.trim().length < 2) {
        errors.push({
            code: 1,
            message: "Enter a name",
        })
    }

    if (!data.email.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)) {
        errors.push({
            code: 2,
            message: "Enter a valid email address",
        })
    }

    if (data.message.trim().length < 15) {
        errors.push({
            code: 3,
            message: "Enter a message with atleast 15 characters",
        })
    }

    if (errors.length > 0)
        return {
            result: false,
            errors: errors,
        }

    return {
        data: {
            name: data.name,
            email: data.email,
            message: data.message,
        },
        result: true,
    }
}

const contactFormSubmit = async (api, data) => {
    let res: any = await fetch(api, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })

    res = await res.json()

    if (res.success) {
        return {
            result: true,
        }
    }
    return {
        result: false,
        ...res,
    }
}

const defaults = {
    disqus: null,
    twoColumnWall: true,
    darkmode: false,
    switchTheme: true,
    capitalizeTitleOnHome: true,
    cookiePolicy: false
}

Object.keys(defaults).forEach(item => {
    if (siteMetadata[item] === undefined) {
        siteMetadata[item] = defaults[item]
    }
})

export { siteMetadata, beforeContactFormSubmit, contactFormSubmit }
