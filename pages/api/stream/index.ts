import { NextApiRequest, NextApiResponse } from 'next'
import supabase from '../../../lib/supabase';

export default (_req: NextApiRequest, res: NextApiResponse): void => {

    const getShowcases = async () => {
        const { data, error } = await supabase
            .from('random_showcases')
            .select()
        res.status(200).json(data);
    }
    getShowcases();

}