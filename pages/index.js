import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AluraCommons'
import Box from '../src/components/Box'
import MainGrid from '../src/components/MainGrid'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

const ProfileSidebar = (propriedades) => {
    return (
        <Box>
            <img src={`https://github.com/${propriedades.githubUser}.png`} alt="thelunardi" style={{ borderRadius: '8px' }} />
        </Box>
    )
}

const Home = () => {
    const githubUser = 'thelunardi'
    const favoritePeople = [
        'wilcorrea',
        'omariosouto',
        'marcobrunodev',
        'peas',
        'IgorHalfeld',
        'unclebob'
    ]

    return (
        <>
            <AlurakutMenu />
            <MainGrid>
                <div style={ { gridArea: 'profileArea' } }>
                    <ProfileSidebar githubUser={githubUser}/>
                </div>
                <div style={ { gridArea: 'welcomeArea' } }>
                    <Box>
                        <h1 className="smallTitle">
                            Bem vindo
                        </h1>

                        <OrkutNostalgicIconSet />
                    </Box>
                    <Box>O que você deseja fazer</Box>
                </div>
                <div style={ { gridArea: 'relationsArea' } }>
                    {/*<Box>Amigos</Box>*/ }
                    <ProfileRelationsBoxWrapper>
                        <h2 className="smallTitle">
                            Pessoas da Comunidade ({ favoritePeople.length })
                        </h2>
                        <ul>
                            {
                                favoritePeople.map(person => {
                                    return (
                                        <li>
                                            <a href={ `/users/${ person }` } key={ person }>
                                                <img src={ `https://github.com/${ person }.png` } alt={ person } />
                                                <span>{ person }</span>
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
