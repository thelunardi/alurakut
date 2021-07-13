import { useState, useEffect } from 'react'

import { OrkutNostalgicIconSet } from '../src/components/NostalgicIconSet'
import AlurakutMenu from "../src/components/Menu"
import Box from '../src/components/Box'
import MainGrid from '../src/components/MainGrid'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'
import ProfileSidebar from '../src/components/ProfileSidebar'

const Home = () => {
    const [followers, setFollowers] = useState([])
    const githubUser = 'thelunardi'
    const favoritePeople = [
        'wilcorrea',
        'omariosouto',
        'marcobrunodev',
        'peas',
        'IgorHalfeld',
        'unclebob'
    ]

    useEffect(() => {
        const getFollowers = async () => {
            const followers = await fetchFollowers()
            if (followers.length > 6) {
                followers.length = 6
            }
            setFollowers(followers)
        }
        getFollowers()
    }, [])

    const fetchFollowers = async () => {
        const res = await fetch('https://api.github.com/users/thelunardi/followers')
        return await res.json()
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
                    <Box>O que você deseja fazer</Box>
                </div>
                <div style={{gridArea: 'relationsArea'}}>
                    {/*<Box>Amigos</Box>*/}
                    <ProfileRelationsBoxWrapper>
                        <h2 className="smallTitle">
                            Pessoas da Comunidade ({favoritePeople.length})
                        </h2>
                        <ul>
                            {
                                favoritePeople.map(person => {
                                    return (
                                        <li key={person}>
                                            <a href={`/users/${person}`} key={person}>
                                                <img src={`https://github.com/${person}.png`} alt={person} />
                                                <span>{person}</span>
                                            </a>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </ProfileRelationsBoxWrapper>
                    <ProfileRelationsBoxWrapper>
                        <h2 className="smallTitle">
                            Meus Seguidores ({followers.length})
                        </h2>
                        <ul>
                            {
                                followers && followers.map(person => {
                                    return (
                                        <li key={person.login}>
                                            <a href={`/users/${person.login}`} key={person.login}>
                                                <img src={`https://github.com/${person.login}.png`}
                                                     alt={person.login} />
                                                <span>{person.login}</span>
                                            </a>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </ProfileRelationsBoxWrapper>
                </div>
            </MainGrid>
        </>
    )
}

export default Home
