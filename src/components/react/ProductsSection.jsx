import { Input } from "@nextui-org/react";
import { Select, SelectSection, SelectItem, Image } from "@nextui-org/react";
import '@react/ProductsSection.css';
import { SearchIcon } from "@icons/SearchIcon";
import { useState } from "react";
import { motion } from "framer-motion";
import { MagicMotion } from "react-magic-motion";
import { GridResponsive } from "@react/GridResponsive";
import { Arrow } from "@react/Arrow";
const HeaderSearch = () => {
    return (
        <div className=" flex gap-4 mt-12">
            <Input
                placeholder="Ingrese un texto..."
                radius="full"
                startContent={<SearchIcon />}
            >
            </Input>
            <Select
                placeholder="Relevancia"
                className=" brand max-w-36  *:text-white  "
                color="primary"
                id="selectItems"
                style={{
                    color: "white",
                }}
            >
                <SelectSection className="brand  text-white" color="primary" >
                    <SelectItem key="Eagle">Eagle</SelectItem>
                    <SelectItem key="Parrot">Parrot</SelectItem>
                    <SelectItem key="Penguin">Penguin</SelectItem>
                </SelectSection >
            </Select>
        </div>
    )
}

const CategoryMoreSearched = () => {

    const categoriesMock = [
        {
            id: 1,
            name: "Categoria 1",
            active: true
        },
        {
            id: 2,
            name: "Categoria 2",
            active: false
        },
        {
            id: 3,
            name: "Categoria 3",
            active: false
        },
        {
            id: 4,
            name: "Categoria 4",
            active: false
        },
        {
            id: 5,
            name: "Categoria 5",
            active: false
        }
    ]

    const [categories, setCategories] = useState([...categoriesMock])

    const toggleClick = ({ id }) => {
        setCategories(prevCategories => {
            const newCategories = prevCategories.map(category => {
                if (category.id === id) {
                    return {
                        ...category,
                        active: !category.active
                    };
                }
                return category;
            });
            newCategories.sort((a, b) => {
                if (a.active && !b.active) {
                    return -1;
                } else if (!a.active && b.active) {
                    return 1;
                } else {
                    return a.id - b.id;
                }
            });
            return newCategories;
        });
    }

    const activeClass = "bg-customOrange-500 hover:bg-customOrange-400 text-white  border-customBlue-600";
    const inactiveClass = "bg-customBlue-600 hover:bg-[#2c1850] text-customOrange-500 border-customOrange-500 ";
    return (
        <MagicMotion
            transition={{
                duration: 0.3,
            }}
        >
            <ul className=" place-self-center place-items-center place-content-center placecenter  mt-4 gap-2 grid grid-cols-[repeat(auto-fit,_minmax(8rem,_1fr))]   ">

                {
                    categories.map((category) => (
                        <li key={category.id} className=" relative w-full">
                            <button onClick={() => { toggleClick({ id: category?.id }) }} className={` ${category?.active ? activeClass : inactiveClass} border w-full px-4 py-1 rounded-xl  transition-all  `}>
                                {category.name}
                                {
                                    category?.active && (

                                        <div className=" -right-1  h-full  top-0 absolute flex justify-center items-center">
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                key={category.id}
                                                className="  size-5 pb-[2px] bg-customBlue-600 flex justify-center  items-center leading-[1px] rounded-full border border-customOrange-500 text-customOrange-500">
                                                ×
                                            </motion.div>
                                        </div>

                                    )
                                }
                            </button>
                        </li>
                    ))

                }

            </ul>
        </MagicMotion>

    )
}

const ProductCard = ({ id, shortName, imageUrl }) => {

    return (
        <article className="w-full hover:-translate-y-1 transition-all   border border-transparent hover:border-customOrange-500 relative  p-4 h-full max-w-44  overflow-hidden rounded-[20px] bg-white">
            <a id="productImage" href={`/productos/${id}`}>
                <Image src={imageUrl} radius="" className="   white rounded-2xl  h-36  object-scale-down " />
            </a>
            <p className=" leading-4">{shortName}</p>
            <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">Desde $100</p>
                <div />
            </div>
            <a
                id="linkToProduct"
                class="bg-customOrange-500  hover:bg-customOrange-300   absolute  z-30  -bottom-7 rotate-90 -right-[1.2rem] transition-all hover:scale-110 rounded-tl-[30px] rounded-bl-[35px] p-4 flex items-end rounded-br-[30px] size-[70px]"
                href={`/productos/${id}`}
            >
                <Arrow />
            </a>
        </article>
    )
}

export const ProductsSection = () => {

    const fakeProducts = Array(9).fill({
        id: 1,
        shortName: "Andamio",
        imgUrl: "/images/andamioWhite.jpg",
    })

    return (
        <>
            <HeaderSearch />
            <CategoryMoreSearched />
            <div className=" mt-4">
                <GridResponsive  >
                    {fakeProducts?.map((product, i) => (
                        <li key={i} className="  w-full  flex justify-center items-center">
                            <ProductCard
                                id={product.id}
                                shortName={product.shortName}
                                imageUrl={product.imgUrl}
                            />
                        </li>
                    ))}
                </GridResponsive>
            </div>

        </>
    );
}