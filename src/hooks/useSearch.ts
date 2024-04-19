import { useState, useEffect, useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation'; // Assuming you're using Next.js routing
import { getPlatformById, shuffle } from '@/lib/utils'; // Ensure all necessary imports
import { getToken } from '@/lib/auth';
import { useNavigator } from '@/context/useNavigatiorContext';
import { usePlatform } from '@/context/usePlatforms';
import { useSelcetedImages } from '@/lib/SelectedToDownload';
import { useDialog } from '@/context/useDialog';
import { buildFilterQuery, constructNewFilters } from '@/utils/filterHelpers';

export const useSearch = () => {

    const path = usePathname();
    const platformId = path.split('/search/')[1]; // Or however you're determining it based on URL
    const platform = getPlatformById(platformId); // Ensure this function can handle conversion from ID

    const params = useSearchParams()
    const keyword = params.get('q')

    const [data, setData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [filters, setFilters] = useState<any[]>([]);
    const [searchKeyword, setSearchKeyword] = useState('')

    const { setSingleApp } = usePlatform();
    const { setSelected, setPlatforms } = usePlatform();
    const { setActiveView, setActiveControls } = useNavigator();
    const { showDialog, DIALOG_ENUM } = useDialog();
    const { setSelectedImages } = useSelcetedImages()

    const filterQuery = buildFilterQuery(params, platform)

    useEffect(() => {
        setActiveView('menuWithSearch');
        setActiveControls('menu-search');
        setSearchKeyword(keyword);
        setPlatforms([2, 1, 3]); // Initialize Platform Switcher
        setSelected(parseInt(platform))

        // Set the new filters
        const newFilters = constructNewFilters(params);

        setFilters(newFilters);
        setSingleApp('search');

        const token = getToken()
        if (!token) { showDialog(DIALOG_ENUM.ACCESS); }

        return () => {
            setSelectedImages({ appName: '', images: [] });
            setActiveControls('');
            setFilters([]);
            setSingleApp('');
            setActiveView('');
        };
    }, []);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const req = await fetch('/api/search/get-screens', {
                method: 'POST',
                body: JSON.stringify({
                    token: getToken(),
                    keyword,
                    platform, // The platform variable now contains the correctly parsed platform ID
                    filters: filterQuery
                }),
            });
            const res = await req.json();
            const shuffledData = shuffle(res.screens);
            setData(shuffledData);
            setIsLoading(false);
        }

        fetchData();
    }, [searchKeyword, platform]);

    const loadMore = useCallback(() => {
        return setTimeout(async () => {
            setIsLoading(true)
            // Load more stream items
            async function getData() {
                const req = await fetch('/api/search/get-screens', {
                    method: 'POST',
                    body: JSON.stringify({
                        token: getToken(),
                        searchKeyword,
                        filters: filterQuery,
                        offset: data?.length,
                        limit: 10
                    })
                })
                const res = await req.json()
                const shuffledData = shuffle(res.screens)
                setData(prev => [...prev, ...shuffledData])
            }
            getData()
            setIsLoading(false)
        }, 500);
    }, [data]);

    return { data, isLoading, loadMore, filters, setFilters };
}