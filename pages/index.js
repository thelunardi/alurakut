import nookies from 'nookies'
import jwt from 'jsonwebtoken'

import AlurakutMenu from "../src/components/Menu"
import MainGrid from '../src/components/MainGrid'

const Home = (props) => {
    const {githubUser} = props

    return (
        <>
            <AlurakutMenu githubUser={githubUser} />
            <MainGrid githubUser={githubUser} />
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
    const {githubUser} = jwt.decode(token)
    const responseGithub = await fetch(`https://github.com/${githubUser}`)
    if (responseGithub?.status === 404 || !isAuthenticated) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            }
        }
    }

    return {
        props: {githubUser}
    }
}
