export const companySizesMarketCap = [
    {
        label: 'All',
        value: undefined,
        operator: undefined,
    },
    { label: '>$100B', value: 100000, previous: 'All', next: '$50M-$100M', operator: 'gt' },
    { label: '$50B-$100B', value: [50001, 100000], previous: '$10B-$50B', next: '<$50M', operator: 'between' },
    { label: '$10B-$50B', value: [10001, 50000], previous: '$1B-$10B', next: '$50B-$100B', operator: 'between' },
    { label: '$1B-$10B', value: [1001, 10000], previous: '$500M-$1B', next: '$10B-$50B', operator: 'between' },
    { label: '$500M-$1B', value: [501, 1000], previous: '$100M-$500M', next: '$1B-$10B', operator: 'between' },
    { label: '$100M-$500M', value: [101, 500], previous: '$50M-$100M', next: '$500M-$1B', operator: 'between' },
    { label: '$50M-$100M', value: [51, 100], previous: '>$100B', next: '$100M-$500M', operator: 'between' },
    { label: '<$50M', value: 50, previous: '$50B-$100B', operator: 'lt' },
];

export const companySizesBookValue = [
    {
        label: 'All',
        value: undefined,
        operator: undefined,
    },
    {
        label: '>$50B',
        value: 50000000,
        operator: 'gt',
    },
    {
        label: '$10B-$50B',
        value: [10000000, 50000000],
        operator: 'between',
    },
    {
        label: '$1B-$10B',
        value: [1000000, 10000000],
        operator: 'between',
    },
    {
        label: '$500M-$1B',
        value: [500000, 1000000],
        operator: 'between',
    },
    {
        label: '$100M-$500M',
        value: [100000, 500000],
        operator: 'between',
    },
    {
        label: '$50M-$100M',
        value: [50000, 100000],
        operator: 'between',
    },
    {
        label: '<$50M',
        value: 50000,
        operator: 'lt',
    },
];
