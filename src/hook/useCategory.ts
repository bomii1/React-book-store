import { useState, useEffect } from "react";
import { fetchCategory } from "../api/category.api";
import { Category } from "../models/category.models";

export const useCategory = () => {
    const [category, setCategory] = useState<Category[]>([]);

    useEffect(() => {
      fetchCategory().then((category) => {

        const categoryWithAll = [
            {
                category_id: null,
                category_name: '전체',
            },
            ...category,
        ];
        setCategory(categoryWithAll);
      });
    }, []);

    return { category };
}