// the function that extracts the filter (components, tag, category) from the URL query string (params)
function getFilterParams(params) {
    const components = params.getAll('component');
    const tag = params.getAll('tag');
    const category = params.getAll('category');

    return { components, tag, category };
}

// the function that constructs the filter query for the request from the filter parameters
export function buildFilterQuery(params, platform) {
    let filterQuery = `platform = ${platform}`

    const { components, tag, category } = getFilterParams(params);

    if (Array.isArray(components) && components.length > 0) {
        filterQuery = filterQuery + ` AND components IN [${components.map(el => `'${el}'`).join(',')}]`;
    }

    if (Array.isArray(tag) && tag.length > 0) {
        filterQuery = filterQuery + ` AND tags IN [${tag.map(el => `'${el}'`).join(',')}]`;
    }

    if (Array.isArray(category) && category.length > 0) {
        filterQuery = filterQuery + ` AND app.categories IN [${category.map(el => `'${el}'`).join(',')}]`;
    }
    return {filterQuery, components, tag, category};
}

// the function that constructs the new filters from the filter parameters
export function constructNewFilters(params) {
    const { components, tag, category } = getFilterParams(params);

    return [
        ...components.map(el => {
            return {
                type: 'component',
                tag: el
            }
        }),
        ...tag.map(el => {
            return {
                type: 'tag',
                tag: el
            }
        }),
        ...category.map(el => {
            return {
                type: 'category',
                tag: el
            }
        }),
    ];
}