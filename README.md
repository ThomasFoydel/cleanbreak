<div align="center"><h1>Clean Break</h1></div>

<div align="center"><h5>A drum machine for the browser <a href="http://cleanbreak.herokuapp.com/">live demo here</a></h5></div>

<img src="/client/public/imgs/preview.jpg" width="100%" >

Its a Web Audio API step sequencer. I made this because drums are cool and people should be able to experiment with music production without having to install anything beyond their browser.

Beats are programmable using the sequencer grid. Little grey squares make no sound. Black squares will play the sample loaded into that rack. Big red squares will play the sample a little louder. The sliders below the sequencer can be used to mix the volume/panning of individual samples, or send the sample signals to various effects (distortion, ping pong delay, and reverb).

Presets can be saved, edited, or deleted if a user signs in.

This project uses:

- React
- React-Spring
- Context for state management
- SASS
- NextJS
- NextAuth
- MongoDB / Mongoose
- ToneJS
