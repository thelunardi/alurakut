import { useState, useEffect } from 'react'

import { OrkutNostalgicIconSet } from '../src/components/NostalgicIconSet'
import AlurakutMenu from "../src/components/Menu"
import Box from '../src/components/Box'
import MainGrid from '../src/components/MainGrid'
import ProfileRelations from '../src/components/ProfileRelations'
import ProfileSidebar from '../src/components/ProfileSidebar'
import { v4 as uuid_v4 } from "uuid"

const Home = () => {
    const [followers, setFollowers] = useState([])
    const [title, setTitle] = useState('')
    const [url, setURL] = useState('')
    const [profileCommunity, setProfileCommunity] = useState([{
            id: uuid_v4(),
            title: 'De volta para o Futuro',
            image: 'https://upload.wikimedia.org/wikipedia/en/d/d2/Back_to_the_Future.jpg',
            url: 'https://exame.com/tecnologia/69-comunidades-que-voce-precisa-visitar-antes-do-fim-do-orkut/'
        }])
    const githubUser = 'thelunardi'

    useEffect(() => {
        const getFollowers = async () => {
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
        }
        getFollowers()
    }, [])

    const fetchFollowers = async () => {
        const res = await fetch('https://api.github.com/users/thelunardi/followers')
        return await res.json()
    }

    const addCommunity = (e) => {
        e.preventDefault()

        const imageAddress = `https://picsum.photos/200/300?id=${uuid_v4()}`

        const newCommunity = {id: uuid_v4(), title, image: imageAddress, url}
        const newCommunities = [...profileCommunity, newCommunity]

        setProfileCommunity(newCommunities)
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
                                onChange={ (e) => setTitle(e.target.value) }
                                placeholder="Qual vai ser o nome da sua comunidade?"
                                name="title"
                                aria-label="Qual vai ser o nome da sua comunidade?"
                                type="text"
                            />
                            <input
                                value={url}
                                onChange={ (e) => setURL(e.target.value) }
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
                    <ProfileRelations title="Meus Amigos" items={followers}/>
                    <ProfileRelations title="Minhas Comunidades" items={profileCommunity}/>
                </div>
            </MainGrid>
        </>
    )
}

export default Home
