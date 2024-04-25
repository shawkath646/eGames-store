import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: process.env.APP_BASE_URL as string,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${process.env.APP_BASE_URL}/product`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${process.env.APP_BASE_URL}/order`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${process.env.APP_BASE_URL}/profile`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.7,
        },
        {
            url: `${process.env.APP_BASE_URL}/admin`,
            lastModified: new Date(),
            changeFrequency: 'hourly',
            priority: 0.6,
        },
        {
            url: `${process.env.APP_BASE_URL}/admin/payments`,
            lastModified: new Date(),
            changeFrequency: 'hourly',
            priority: 0.6,
        },
        {
            url: `${process.env.APP_BASE_URL}/admin/orders`,
            lastModified: new Date(),
            changeFrequency: 'hourly',
            priority: 0.6,
        },
        {
            url: `${process.env.APP_BASE_URL}/admin/users`,
            lastModified: new Date(),
            changeFrequency: 'hourly',
            priority: 0.6,
        },
        {
            url: `${process.env.APP_BASE_URL}/admin/settings`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.6,
        }
    ]
}