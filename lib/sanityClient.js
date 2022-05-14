import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: 'oir22w6f',
  dataset: 'production',
  apiVersion: '2021-03-25',
  token:
    'skT0g1f8NFvXVTvdv2Q9bYFwqyn9ziDvnmL2rHEfvtkpKCVCOQzWz3MBeOpS8KsTNFv9hJJDWgYaJJFttcEMq49GcPVbAXHtxeJAsClc59qFDbKESvEH6IH7ckh4aBo8KId5f4ZIDCuKBNv6geymZ1aq4oYgBl4TvbveJLN64nQxwgdnjJ2H',
  useCdn: false,
})
