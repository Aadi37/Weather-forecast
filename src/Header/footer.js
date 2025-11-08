import linkedin from "../images/linkedin.png";
import instagram from "../images/instagram.png";
import discord from "../images/discord.png"
const Footer = () => {
    return <>
    <div className='footerSection py-8'>
        <div className='container mx-auto w-4/5'>
            <div className='ColFour md:w-1/4'>
                <div className='footerContact'> 
                     <ul className='flex gap-5 mt-5'>
                        <li>
                            <a href="www.linkedin.com/in/aaditya-kamle-43803067" target="_blank"><img src={linkedin} width={32}/></a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/kamle7024/" target="_blank"><img src={instagram} width={32}/></a>
                        </li>
                        <li>
                            <a href="https://discord.com/users/aadi_42989" target="_blank"><img src={discord} width={32}/></a>
                        </li>
                     </ul>
                </div>
            </div>
        </div>
    </div>
    </>
}

export default Footer;