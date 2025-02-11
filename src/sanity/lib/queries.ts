export const STARTUPS_QUERY = `
  *[_type == "startup" && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search] | order(_createdAt desc) {
    _id, 
    title,
    slug,
    _createdAt, 
    author -> {
      _id, name, image, bio
    },
    views, 
    description, 
    category, 
    image
  }
`;
export const STARTUP_BY_ID_QYERY = `
  *[_type == "startup" && _id == $id][0]{
    _id, 
    title,
    slug,
    _createdAt, 
    author -> {
      _id, name, image, bio
    },
    views, 
    description, 
    category, 
    image,
    pitch
  }
`;

export const STARTUP_VIEWS_QYERY = `
  *[_type == "startup" && _id == $id][0]{_id, views}`;


export const AUTHOR_BY_GITHUB_ID_QUERY = `
*[_type == "startup" && id == $id][0]{
  _id, 
  id,
  name,
  views,
  username,
  email,
  image,
  bio
}`;


