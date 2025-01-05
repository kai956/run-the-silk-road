import Image from 'next/image';

export default function Logo() {
  return (
    <div className="flex justify-center items-center py-8">
      <Image
        src="/logo.png"
        alt="Silk Road Marathon Logo"
        width={300}
        height={100}
        priority
        className="object-contain"
      />
    </div>
  );
} 