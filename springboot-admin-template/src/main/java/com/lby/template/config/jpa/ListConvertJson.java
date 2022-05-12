package com.lby.template.config.jpa;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.lby.template.enums.RoleEnum;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.List;

/**
 * Author: laishao
 * Date: 2022/5/12
 */
@Converter
public class ListConvertJson implements AttributeConverter<List<RoleEnum>,String> {

    @Override
    public String convertToDatabaseColumn(List<RoleEnum> objects) {
        return objects == null ? null : JSONObject.toJSONString(objects);
    }

    @Override
    public List<RoleEnum> convertToEntityAttribute(String s) {
        return JSONArray.parseArray(s,RoleEnum.class);
    }
}
