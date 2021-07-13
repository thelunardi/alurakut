import Wrapper from './styles'

const BASE_URL = 'http://alurakut.vercel.app/'

const AlurakutProfileSidebarMenuDefault = () => {
    return (
        <AlurakutProfileSidebarMenuDefault.Wrapper>
            <nav>
                <a href="/">
                    <img src={`${BASE_URL}/icons/user.svg`}  alt="perfil"/>
                    Perfil
                </a>
                <a href="/">
                    <img src={`${BASE_URL}/icons/book.svg`}  alt="recados"/>
                    Recados
                </a>
                <a href="/">
                    <img src={`${BASE_URL}/icons/camera.svg`}  alt="fotos"/>
                    Fotos
                </a>
                <a href="/">
                    <img src={`${BASE_URL}/icons/sun.svg`}  alt="depoimentos"/>
                    Depoimentos
                </a>
            </nav>
            <hr />
            <nav>
                <a href="/">
                    <img src={`${BASE_URL}/icons/plus.svg`}  alt="trends"/>
                    GitHub Trends
                </a>
                <a href="/logout">
                    <img src={`${BASE_URL}//icons/logout.svg`}  alt="sair"/>
                    Sair
                </a>
            </nav>
        </AlurakutProfileSidebarMenuDefault.Wrapper>
    )
}

export default AlurakutProfileSidebarMenuDefault

AlurakutProfileSidebarMenuDefault.Wrapper = Wrapper