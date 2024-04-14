import Posts from "./Posts";
import UpdatePost from "./UpdatePost";
import AddPost from "./AddPost";

export default function UserFeed() {

  return (
    <div className="h-full flex flex-col items-center">
      <div className="mb-4 w-3/5 h-full border-solid border-x-2 border-b-2 rounded-b-2xl border-slate-600">
        <AddPost />
        <UpdatePost />
        <Posts />
      </div>
    </div>
  );
}


