import type { Vehicle } from "../../shared/gallery";
import galleryVolvo from "@/assets/gallery-volvo.jpg";
import galleryVolvo2 from "@/assets/gallery-volvo-2.jpg";
import galleryVolvo3 from "@/assets/gallery-volvo-3.jpg";
import galleryVolvo4 from "@/assets/gallery-volvo-4.jpg";
import galleryBmw from "@/assets/gallery-bmw.jpg";
import galleryBmw2 from "@/assets/gallery-bmw-2.jpg";
import galleryBmw3 from "@/assets/gallery-bmw-3.jpg";
import galleryFortuner from "@/assets/gallery-fortuner.jpg";
import gallerySw42 from "@/assets/gallery-sw4-2.jpg";
import gallerySw43 from "@/assets/gallery-sw4-3.jpg";
import galleryGclass from "@/assets/gallery-gclass.jpg";
import galleryGclass2 from "@/assets/gallery-gclass-2.jpg";
import galleryGclass3 from "@/assets/gallery-gclass-3.jpg";
import galleryHaval from "@/assets/gallery-haval.jpg";
import galleryHaval2 from "@/assets/gallery-haval-2.jpg";
import galleryHaval3 from "@/assets/gallery-haval-3.jpg";
import galleryDefender1 from "@/assets/gallery-defender-1.jpg";
import galleryDefender2 from "@/assets/gallery-defender-2.jpg";
import galleryDefender3 from "@/assets/gallery-defender-3.jpg";

export const defaultVehicles: Vehicle[] = [
  {
    id: "vehicle-1",
    published: true,
    caption: "Volvo XC90 Blindado Nível III-A",
    images: [galleryVolvo, galleryVolvo2, galleryVolvo3, galleryVolvo4].map((url, index) => ({ id: `photo-${index}`, url, alt: "" })),
  },
  {
    id: "vehicle-2",
    published: true,
    caption: "BMW X6 Blindado Nível III-A",
    images: [galleryBmw, galleryBmw2, galleryBmw3].map((url, index) => ({ id: `photo-${index}`, url, alt: "" })),
  },
  {
    id: "vehicle-3",
    published: true,
    caption: "Toyota SW4 Blindado Nível III-A",
    images: [galleryFortuner, gallerySw42, gallerySw43].map((url, index) => ({ id: `photo-${index}`, url, alt: "" })),
  },
  {
    id: "vehicle-4",
    published: true,
    caption: "Mercedes G-Class AMG Blindado Nível III-A",
    images: [galleryGclass, galleryGclass2, galleryGclass3].map((url, index) => ({ id: `photo-${index}`, url, alt: "" })),
  },
  {
    id: "vehicle-5",
    published: true,
    caption: "Haval H6 Blindado Nível III-A",
    images: [galleryHaval, galleryHaval2, galleryHaval3].map((url, index) => ({ id: `photo-${index}`, url, alt: "" })),
  },
  {
    id: "vehicle-6",
    published: true,
    caption: "Land Rover Defender Blindado Nível III-A",
    images: [galleryDefender1, galleryDefender2, galleryDefender3].map((url, index) => ({ id: `photo-${index}`, url, alt: "" })),
  },
];

