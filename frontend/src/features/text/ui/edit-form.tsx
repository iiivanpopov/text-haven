"use client";

import Textarea from "@shared/ui/user-input/textarea";
import Input from "@shared/ui/user-input/input";
import { useAppDispatch, useAppSelector } from "@shared/hooks/redux";
import { setContent, setName } from "@features/text/model/slice";

export default function EditForm() {
  const { text } = useAppSelector((state) => state.textReducer);
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col">
      <Input
        name="Title"
        className="text-gray-800 dark:text-gray-100 text-4xl p-0"
        value={text.name}
        onChange={(e) => dispatch(setName(e.target.value))}
      />
      <Textarea
        value={text.content}
        className="text-md overflow-auto h-[70vh] w-[1270px]"
        onChange={(e) => dispatch(setContent(e.target.value))}
      />
    </div>
  );
}
