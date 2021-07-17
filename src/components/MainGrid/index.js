import { v4 as uuid_v4 } from 'uuid'
import { useEffect, useState } from 'react'

import ProfileSidebar from '../ProfileSidebar'
import Box from '../Box'
import { OrkutNostalgicIconSet } from '../NostalgicIconSet'
import ProfileRelations from "../ProfileRelations"
import MainGridStyle from './style'
import { fetchCommunities, fetchFollowers } from '../../service/api'

const MainGrid = (props) => {
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
                const followers = await fetchFollowers(githubUser)
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
        <MainGrid.div>
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
        </MainGrid.div>
    )
}

export default MainGrid

MainGrid.div = MainGridStyle

