const fetchFollowers = async (githubUser) => {
    try {
        const res = await fetch(`https://api.github.com/users/${githubUser}/followers`)
        return await res.json()
    } catch (e) {
        throw e
    }
}

const fetchCommunities = async () => {
    return await fetch(
        'api/communities',
        {
            headers: {
                'Content-Type': 'application/json',
            }
        }
    )
        .then(res => res.json())
        .then((res) => res.data)
        .catch((error) => {
            console.log(error)
        })
}

export {
    fetchCommunities,
    fetchFollowers
}