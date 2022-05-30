import React from "react";
import PostCard from "../../components/PostCard/PostCard";
import "./Home.scss";
const server_base_url = import.meta.env.VITE_SERVER_BASE_URL;

const Home = () => {
  return (
    <div className="home">
      <div className="posts-container flex-cc">
        <PostCard
          title="My first blog, hope its good"
          desc=" Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea iure explicabo repellat? Officia cum nostrum animi ut minus debitis consequatur, rem obcaecati similique consectetur officiis tempore, illo ipsam veritatis quis.
    Repudiandae ipsam aspernatur earum commodi consectetur nemo dolores sunt corporis repellendus reprehenderit obcaecati voluptatibus aliquam, laborum praesentium neque.   Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum nulla ipsa commodi veritatis at nostrum dolores magnam, quos deleniti cupiditate esse eius temporibus, corrupti doloribus iste tempora, architecto quisquam vero."
          img="https://i.pinimg.com/474x/ce/74/f2/ce74f24391fd633ef41ae68faf477289.jpg"
          like={0}
        />
        <PostCard
          title="My first blog, hope its good"
          desc=" Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea iure explicabo repellat? Officia cum nostrum animi ut minus debitis consequatur, rem obcaecati similique consectetur officiis tempore, illo ipsam veritatis quis.
    Repudiandae ipsam aspernatur earum commodi consectetur nemo dolores sunt corporis repellendus reprehenderit obcaecati voluptatibus aliquam, laborum praesentium neque.   Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum nulla ipsa commodi veritatis at nostrum dolores magnam, quos deleniti cupiditate esse eius temporibus, corrupti doloribus iste tempora, architecto quisquam vero."
          img="https://i.pinimg.com/474x/ce/74/f2/ce74f24391fd633ef41ae68faf477289.jpg"
          like={0}
        />
        <PostCard
          title="My first blog, hope its good"
          desc=" Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea iure explicabo repellat? Officia cum nostrum animi ut minus debitis consequatur, rem obcaecati similique consectetur officiis tempore, illo ipsam veritatis quis.
    Repudiandae ipsam aspernatur earum commodi consectetur nemo dolores sunt corporis repellendus reprehenderit obcaecati voluptatibus aliquam, laborum praesentium neque.   Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum nulla ipsa commodi veritatis at nostrum dolores magnam, quos deleniti cupiditate esse eius temporibus, corrupti doloribus iste tempora, architecto quisquam vero."
          img="https://i.pinimg.com/474x/ce/74/f2/ce74f24391fd633ef41ae68faf477289.jpg"
          like={0}
        />
        <PostCard
          title="My first blog, hope its good"
          desc=" Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea iure explicabo repellat? Officia cum nostrum animi ut minus debitis consequatur, rem obcaecati similique consectetur officiis tempore, illo ipsam veritatis quis.
    Repudiandae ipsam aspernatur earum commodi consectetur nemo dolores sunt corporis repellendus reprehenderit obcaecati voluptatibus aliquam, laborum praesentium neque.   Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum nulla ipsa commodi veritatis at nostrum dolores magnam, quos deleniti cupiditate esse eius temporibus, corrupti doloribus iste tempora, architecto quisquam vero."
          img="https://i.pinimg.com/474x/ce/74/f2/ce74f24391fd633ef41ae68faf477289.jpg"
          like={0}
        />
        <PostCard
          title="My first blog, hope its good"
          desc=" Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea iure explicabo repellat? Officia cum nostrum animi ut minus debitis consequatur, rem obcaecati similique consectetur officiis tempore, illo ipsam veritatis quis.
    Repudiandae ipsam aspernatur earum commodi consectetur nemo dolores sunt corporis repellendus reprehenderit obcaecati voluptatibus aliquam, laborum praesentium neque.   Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum nulla ipsa commodi veritatis at nostrum dolores magnam, quos deleniti cupiditate esse eius temporibus, corrupti doloribus iste tempora, architecto quisquam vero."
          img="https://i.pinimg.com/474x/ce/74/f2/ce74f24391fd633ef41ae68faf477289.jpg"
          like={0}
        />
        <PostCard
          title="My first blog, hope its good"
          desc=" Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea iure explicabo repellat? Officia cum nostrum animi ut minus debitis consequatur, rem obcaecati similique consectetur officiis tempore, illo ipsam veritatis quis.
    Repudiandae ipsam aspernatur earum commodi consectetur nemo dolores sunt corporis repellendus reprehenderit obcaecati voluptatibus aliquam, laborum praesentium neque.   Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum nulla ipsa commodi veritatis at nostrum dolores magnam, quos deleniti cupiditate esse eius temporibus, corrupti doloribus iste tempora, architecto quisquam vero."
          img="https://i.pinimg.com/474x/ce/74/f2/ce74f24391fd633ef41ae68faf477289.jpg"
          like={0}
        />
      </div>
    </div>
  );
};

export default Home;
