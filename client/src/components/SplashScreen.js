import logo from './logo.png';
export default function SplashScreen() {
    return (
        <div id="splash-screen">
            Welcome to... <br></br>
            <img src={logo} 
                id='playlister-logo'
                style={{
                    paddingTop: '1%',
                }}> 
            </img><br></br>
            <p
                style = {{
                    fontSize: 20,
                    fontWeight: 'normal',
                    lineHeight: 1.5
                }}>A web application for creating sharable playlists.<br></br>
            To get started,
                go ahead and..</p>
            <div id= 'splash-screen-buttons'>
                <button
                    type='button'
                    class = 'splash-screen-button'
                    onClick={(e) => {
                        e.preventDefault();
                        window.location.href = "/register"}}>
                        Create<br></br>Account</button>
                <button 
                    type='button'
                    class = 'splash-screen-button'
                    onClick={(e) => {
                        e.preventDefault();
                        window.location.href = "/login"}}>
                        Login</button>
                <button class = 'splash-screen-button'>Continue as<br></br>Guest</button>
            </div>  
        </div>
    )
}