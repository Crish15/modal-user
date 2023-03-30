export async function getUsers(size = 0) {
    const res = await fetch(`https://random-data-api.com/api/users/random_user?size=${size}`);

    if(!res.ok)
        return [];

    return res.json();
}
