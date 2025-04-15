/* eslint-disable no-unused-vars */
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import React from 'react'
import { tags } from './filterData'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { MixerHorizontalIcon } from '@radix-ui/react-icons'
import { useLocation, useNavigate } from 'react-router-dom'
import { SheetClose } from '@/components/ui/sheet'

const FilterSheet = () => {
    const navigate=useNavigate();
    const location=useLocation();
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get("category");
    const tag=searchParams.get("tag");
    const handleFilterChange = (section,value) => {
        console.log(value, section)
        
        if (value === "all") {
          searchParams.delete(section);
        } else {
          searchParams.set(section, value);
        }
        const query = searchParams.toString();
        navigate({ search: query ? `?${query}` : "" });
      };
  return (
    <div>
        <SheetClose> 
        <div className="p-5 sticky top-10">
            <div className="flex justify-between lg:w-[20rem]">
              <p className="text-xl tracking-wider">Bộ lọc</p>
              <Button variant="ghost" size="icon">
                <MixerHorizontalIcon />
              </Button>
            </div>

            <CardContent className="mt-5 ">
              <ScrollArea className="space-y-7 h-[85vh]">
                <div>
                  <h1 className="pb-3 text-gray-400 border-b">Danh mục</h1>
                  <div className="pt-5">
                    <RadioGroup onValueChange={(value)=>handleFilterChange("category",value)} className="space-y-3" defaultValue={category || "all"}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="all" id="r1" />
                        <Label htmlFor="r1">Tất cả</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="nha_o" id="r1" />
                        <Label htmlFor="r1">Công trình nhà ở</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="cong_nghiep" id="r2" />
                        <Label htmlFor="r2">Công trình công nghiệp</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="giao_thong" id="r3" />
                        <Label htmlFor="r3">Công trình giao thông</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="pt-9">
                  <h1 className="pb-3 text-gray-400 border-b">Nhãn</h1>

                  <RadioGroup 
                  onValueChange={(value)=>handleFilterChange("tag",value)} className="space-y-3 pt-5" defaultValue={tag || "all"}>
                  
                        {tags.map((item) => (
                      <div key={item} className="flex items-center space-x-2">
                        <RadioGroupItem 
                        value={item} id={`r-${item}`} />
                        <Label htmlFor={`r-${item}`}>{item}</Label>
                      </div>
                    ))}
                   
                    
                  </RadioGroup>
                </div>
              </ScrollArea>
            </CardContent>
          </div></SheetClose>
    </div>
  )
}

export default FilterSheet