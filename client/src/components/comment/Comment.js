import React from "react";
import { Comment } from "semantic-ui-react";
function CommentComponent({ author, time, text, likes }) {
  return (
    <Comment>
      <Comment.Avatar
        as="a"
        src="https://react.semantic-ui.com/images/avatar/small/joe.jpg"
      />
      <Comment.Content>
        <Comment.Author as="a">Joe Henderson</Comment.Author>
        <Comment.Metadata>
          <span>5 days ago</span>
        </Comment.Metadata>
        <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
        <Comment.Actions>
          <a>
            {likes} Like{likes > 1 ? "s" : ""}
          </a>
          <a>Reply</a>
        </Comment.Actions>
      </Comment.Content>
    </Comment>
  );
}

export default CommentComponent;
