import { getToken } from '@/lib/auth';
import { useDialog } from '@/context/useDialog';
import { getPlatformById, shuffle } from '@/lib/utils';
import { usePlatform } from '@/context/usePlatforms';
import { useState, useEffect, useCallback } from 'react';
import { useNavigator } from '@/context/useNavigatiorContext';
import { useSelectedImages } from '@/lib/SelectedToDownload';
import { usePathname, useSearchParams } from 'next/navigation';
import { buildFilterQuery, constructNewFilters } from '@/utils/filterHelpers';

export const useSearch = () => {

    const path = usePathname();
    const platformId = path.split('/search/')[1];
    const platform = getPlatformById(platformId);

    const params = useSearchParams()
    const keyword = params.get('q')

    const [data, setData] = useState<any[]>([]);
    const [filters, setFilters] = useState<any[]>([]);
    const [searchKeyword, setSearchKeyword] = useState("")
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const { setSingleApp } = usePlatform();
    const { showDialog, DIALOG_ENUM } = useDialog();
    const { setSelected, setPlatforms } = usePlatform();
    const { setActiveView, setActiveControls } = useNavigator();
    const { selectedImages, setSelectedImages } = useSelectedImages()
    const filterQuery = buildFilterQuery(params, platform)

    useEffect(() => {
        if (selectedImages.images.length > 0) {
            setActiveControls('selection')
        }
    }, [selectedImages])

    useEffect(() => {
        if (!path.includes('/search')) return;

        const token = getToken();
        if (!token) {
            showDialog(DIALOG_ENUM.ACCESS);
        }

        setActiveView('menuWithSearch');
        setActiveControls('menu-search');
    }, [path]);

    useEffect(() => {
        if (!path.includes('/search')) return;

        setSearchKeyword(keyword);
        setPlatforms([2, 1, 3]);  // Initialize Platform Switcher
        setSelected(parseInt(platform));

        const newFilters = constructNewFilters(params);
        setFilters(newFilters);
        setSingleApp('search');
    }, [path, keyword, platform, params]);

    useEffect(() => {
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
                    platform,
                    filters: filterQuery
                }),
            });
            const res = await req.json();
            const shuffledData = shuffle(res.screens);
            setData(shuffledData);
        }
        fetchData();
        setIsLoading(false);
    }, [params]);

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

    return { data, isLoading, loadMore, searchKeyword, setSearchKeyword, filters, setFilters };
}
