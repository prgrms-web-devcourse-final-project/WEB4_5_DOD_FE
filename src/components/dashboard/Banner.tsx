import bannerImg from "@/assets/images/banner_rabbit.png";
import Image from "next/image";
import Link from "next/link";
import LogoWebHeader from "../ui/LogoWebHeader";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import useMediaQuery from "../feature/schedule/hooks/useMediaQuery";

export const Banner = () => {
  const router = useRouter();
  const isSE = useMediaQuery("(max-width: 390px)");
  return (
    <>
      <div className="w-full flex justify-start sm:hidden px-4">
        <LogoWebHeader type="" handleLogoClick={() => router.push("/")} />
      </div>
      <Link
        href={"/meeting"}
        className="relative flex w-full h-35 sm:h-40 md:h-50 bg-gradient-to-r from-[rgb(138,182,255)] to-[#5291F4] rounded-[20px] px-5 md:px-10 justify-between items-center group"
      >
        <Image
          src={bannerImg}
          alt="배너 이미지"
          priority
          className="absolute bottom-0 left-3 sm:left-10 w-34 h-28 sm:w-44 sm:h-36 md:w-48 md:h-40 group-hover:scale-110 transition-transform duration-300 ease-in-out origin-bottom"
        />
        <div className="flex flex-col w-full h-full justify-between items-end py-5 ">
          <div
            className={`font-[TTTogether] text-[color:var(--color-white)] font-regular leading-9 ${
              isSE ? "text-2xl" : "text-3xl"
            } sm:text-4xl sm:leading-10 md:leading-14 md:text-5xl text-end`}
          >
            보고싶다 친구야
            <br />
            우리 이때어때!
          </div>

          <div className="w-full flex text-xs md:text-lg text-[color:var(--color-white)] justify-end items-center cursor-pointer">
            일정 만들러 가기 <ArrowRight className="ml-2 size-3 md:size-4" />
          </div>
        </div>
      </Link>
    </>
  );
};
