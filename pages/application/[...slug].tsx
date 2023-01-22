import Mobile from "./mobile"
import Web from "./web"
import { useRouter } from 'next/router';
import { supabase } from "../../lib/supabase";
import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";

interface Props {
    application: any
}

const ApplicationPage = ({ application }: Props) => {
    const router = useRouter();
    const platform = (router.query.slug as string[])[0] || []

    switch (platform) {
        default:
            return 'Not Found'
        case "android":
            return <Mobile app={application} />
        case "ios":
            return <Mobile app={application} />
        case "web":
            return <Web app={application} />


    }
}

export default ApplicationPage


export const getStaticPaths = async () => {
    const { data: application, error } = await supabase.from("application").select("*").eq('is_published', true)
    const paths = application?.map((application: any) => {
        let platform;
        switch (application.platform_id) {
            case 1:
                platform = 'android'
                break;
            case 2:
                platform = 'ios'
                break;
            case 3:
                platform = 'web'
                break;
        }
        return {
            params: { id: application.id, slug: [platform, application.slug] }
        }
    })
    return { paths, fallback: false }
}


export const getStaticProps = async (context: { params: { slug: any } }) => {
    const { slug } = context.params;
    const platform = slug[0]


    let platform_id;
    switch (platform) {
        case 'android':
            platform_id = 1
            break;
        case 'ios':
            platform_id = 2
            break;
        case 'web':
            platform_id = 3
            break;
    }

    const { data: application, error } = await supabase
        .from("application")
        .select(`*, screen(*), app_category(*)`)
        .match({ slug: slug[1], platform_id: platform_id, is_published: true })
        .eq('screen.is_published', true)
        .order('id', { foreignTable: 'screen', ascending: true })
        .single()

    return {
        props: {
            application
        },
        revalidate: 60,
    }
}