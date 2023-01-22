import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../../lib/supabase';

type GetShowcasesQuery = {
    page?: number,
    per_page?: number
}

export default (req: NextApiRequest, res: NextApiResponse): void => {
    const query = req.query as GetShowcasesQuery;
    const page = query.page || 1;
    const perPage = query.per_page || 10;



    const getShowcases = async () => {
        const from = (perPage * (page - 1))
        const to = perPage * page
        // console.log('from:', from, 'to: ', to);

        const { data, error } = await supabase
            .from('random_showcases')
            .select('*')
            .range(from + 1, to)

        if (error) {
            res.status(500).json({ error });
        }
        res.status(200).json({ data });
    }
    getShowcases();
}
