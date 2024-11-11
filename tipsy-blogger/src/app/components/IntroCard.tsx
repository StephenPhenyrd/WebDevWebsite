import styles from "./IntroCard.module.css"

export default function IntroCard() { 
    return(
        
            <div className={styles.intro}>
                <div className={styles.textbox}>
                <h1>The Tipsy Blogger</h1>
                <h3>Sips, Stories, & Style</h3>
                <p>
                    Welcome to The Tipsy Blogger! Discover, rate, and share your drink experiences from bars around the world.
                    Here, our community sips, rates, and reviews - from the craftiest cocktails to hidden bar gems. Dive in to find
                    top-rated spot. Unique drink recommendations, and real insights from fellow enthusiasts. Whether you're here to explore 
                    or share, let's raise a glass to memorable nights and hones reviews!
                </p>
                </div>
            </div>
        
    );
}