import Mobile from "./mobile"
import Web from "./web"
import { useRouter } from 'next/router';
import { supabase } from "../../../../client";

interface Props {
    application: any
}

const ApplicationPage = ({ application }: Props) => {
    const router = useRouter();
    const { platform } = router.query;

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
    const { data: application, error } = await supabase.from("application").select("*")
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
            params: { platform: platform, id: application.id, slug: application.slug }
        }
    })
    return { paths, fallback: false }
}

export const getStaticProps = async (context: { params: { slug: any, platform: any } }) => {
    const { slug, platform } = context.params;


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
        .match({ slug: slug, platform_id: platform_id })
        .single()

    return {
        props: {
            application
        },
        revalidate: 1,
    }
}