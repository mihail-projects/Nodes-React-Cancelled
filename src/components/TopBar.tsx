import '../styles/TopBar.css'
import '../styles/Fonts.css'
import cog from '../Media/cog.png';
import book from '../Media/book.png';

type props = {
    projectName:string
}

function TopBar({projectName}:props) {

    return (
        <div id='topbar'>
            <div id='logo'>Node.</div>
            <div id='name'>{projectName}</div>
            <img id='docs' src={book}/>
            <img id='settings' src={cog}/>
        </div>
    )

}

export default TopBar;
