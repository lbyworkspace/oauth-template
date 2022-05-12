package com.lby.template.enums;

import lombok.Getter;
import lombok.ToString;

/**
 * Author: laishao
 * Date: 2022/5/11
 */
@Getter
@ToString
public enum RoleEnum {

    SADMIN("超级管理员","SADMIN"),
    ADMIN("管理员","ADMIN"),
    USER("用户","USER")

    ;

    private String name;
    private String value;

    RoleEnum(String name,String value) {
        this.name = name;
        this.value = value;
    }
}
