import logoImg from "@/assets/logo-newtech.png";

interface LogoProps {
  className?: string;
  showSubtitle?: boolean;
}

const Logo = ({ className = "h-10" }: LogoProps) => {
  return (
    <img
      src={logoImg}
      alt="NewTech Blindagens"
      className={`${className} w-auto object-contain`}
    />
  );
};

export default Logo;
