"use client";

import { useUser } from "@/lib/api/userApi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Callback = () => {
  const router = useRouter();
  const { isSuccess, isError, refetch } = useUser();

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (isSuccess) {
      const url = localStorage.getItem("redirect");
      if (url) {
        router.push(url);
        localStorage.removeItem("redirect");
      } else {
        router.push("/");
      }
    } else if (isError) {
      console.error("No User");
      router.push("/auth/login");
    }
  }, [isSuccess, isError, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">로그인 처리 중...</p>
      </div>
    </div>
  );
};

export default Callback;
