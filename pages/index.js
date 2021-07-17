import { useState, useEffect } from 'react'
import { v4 as uuid_v4 } from 'uuid'
import nookies from 'nookies'
import jwt from 'jsonwebtoken'

import { OrkutNostalgicIconSet } from '../src/components/NostalgicIconSet'
import AlurakutMenu from "../src/components/Menu"
import Box from '../src/components/Box'
import MainGrid from '../src/components/MainGrid'
import ProfileRelations from '../src/components/ProfileRelations'
import ProfileSidebar from '../src/components/ProfileSidebar'

const TOKEN_CMS = process.env.NEXT_PUBLIC_TOKEN_CMS

const Home = (props) => {
    const [followers, setFollowers] = useState([])
    const [title, setTitle] = useState('')
    const [url, setURL] = useState('')
    const [profileCommunity, setProfileCommunity] = useState([])
    const githubUser = props.githubUser

    // array vazio no useEffect executa somente uma vez
    // fazendo só com setState, entraria em loop pois o React fica chamando a Home para renderizar
    useEffect(() => {
        const getCommunity = async () => {
            const communities = await fetchCommunities()
            setProfileCommunity(communities)
        }
        const getFollowers = async () => {
            try {
                const followers = await fetchFollowers()
                const followersToProfile = followers.map(follower => {
                    return {
                        id: uuid_v4(),
                        image: `https://github.com/${follower.login}.png`,
                        url: `/users/${follower.login}`,
                        title: follower.login
                    }
                })

                if (followersToProfile.length > 6) {
                    followersToProfile.length = 6
                }
                setFollowers(followersToProfile)
            } catch (e) {
                console.log(e)
            }
        }
        getFollowers()
        getCommunity()
    }, [])

    const fetchFollowers = async () => {
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

    const addCommunity = (e) => {
        e.preventDefault()

        const imageAddress = `https://picsum.photos/200/300?id=${uuid_v4()}`
        const newCommunity = {title, image: imageAddress, url, slug: githubUser}

        fetch('/api/communities', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCommunity)
        })
            .then(async (response) => {
                const newCommunityFromDato = await response.json()
                const newCommunities = [...profileCommunity, newCommunityFromDato.data]
                setProfileCommunity(newCommunities)
            })

        setTitle('')
        setURL('')
    }

    return (
        <>
            <AlurakutMenu githubUser={githubUser} />
            <MainGrid>
                <div style={{gridArea: 'profileArea'}}>
                    <ProfileSidebar githubUser={githubUser} />
                </div>
                <div style={{gridArea: 'welcomeArea'}}>
                    <Box>
                        <h1 className="smallTitle">
                            Bem vindo
                        </h1>

                        <OrkutNostalgicIconSet
                            recados={0}
                            fotos={1}
                            videos={0}
                            fas={followers.length}
                            mensagens={0}
                            confiavel={3}
                            legal={2}
                            sexy={1}
                        />
                    </Box>
                    <Box>
                        <h2 className="subTitle">O que você deseja fazer?</h2>
                        <form onSubmit={addCommunity}>
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Qual vai ser o nome da sua comunidade?"
                                name="title"
                                aria-label="Qual vai ser o nome da sua comunidade?"
                                type="text"
                            />
                            <input
                                value={url}
                                onChange={(e) => setURL(e.target.value)}
                                placeholder="Coloque uma URL para usarmos"
                                name="image"
                                aria-label="Coloque uma URL para usarmos"
                            />
                            <button>
                                Criar comunidade
                            </button>
                        </form>
                    </Box>
                </div>
                <div style={{gridArea: 'relationsArea'}}>
                    <ProfileRelations title="Meus Amigos" items={followers} />
                    <ProfileRelations title="Minhas Comunidades" items={profileCommunity} />
                </div>
            </MainGrid>
        </>
    )
}

export default Home

export const getServerSideProps = async (context) => {
    const token = await nookies.get(context).USER_TOKEN
    const response = await fetch('https://alurakut.vercel.app/api/auth', {
        headers: {
            'Authorization': token
        }
    })
    const {isAuthenticated} = await response.json()
    if (!isAuthenticated) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            }
        }
    }

    const {githubUser} = jwt.decode(token)
    return {
        props: {githubUser}
    }
}
