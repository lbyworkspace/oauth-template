package com.lby.template.service;

import com.lby.template.entity.SystemUser;

import java.util.List;

public interface UserService {

    void register(SystemUser user);

    List<SystemUser> getAllUser();

}
