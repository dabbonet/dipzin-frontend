import { NextApiRequest, NextApiResponse } from 'next'
import supabase from '../../../lib/supabase';

export default (req: NextApiRequest, res: NextApiResponse): void => {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.per_page) || 10;



    const getShowcases = async () => {
        const from = (perPage * (page - 1))
        const to = perPage * page
        // console.log('from:', from, 'to: ', to);

        const { data, error } = await supabase
            .from('random_showcases')
            .select()
            .range(from + 1, to)

        if (error) {
            res.status(500).json({ error });
            return
        }
        res.status(200).json({ data });
    }
    getShowcases();
}
