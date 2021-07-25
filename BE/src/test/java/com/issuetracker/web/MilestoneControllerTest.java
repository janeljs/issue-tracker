package com.issuetracker.web;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.issuetracker.domain.milestone.Milestone;
import com.issuetracker.domain.milestone.MilestoneRepository;
import com.issuetracker.web.dto.response.MilestoneDTO;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class MilestoneControllerTest extends BaseControllerTest {
    @Autowired
    private MilestoneRepository milestoneRepository;

    @Test
    @Transactional
    @Order(1)
    @DisplayName("마일스톤 조회")
    void read() throws Exception {
        String url = "http://localhost:" + port + "/api/milestones";
        mockMvc.perform(get(url)
                .param("status", "open")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.openedMilestonesCount").value(3))
                .andExpect(jsonPath("$.closedMilestonesCount").value(0))
                .andExpect(jsonPath("$.milestones[0].id").value(1))
                .andExpect(jsonPath("$.milestones[0].title").value("M1"))
                .andExpect(jsonPath("$.milestones[0].open").value(true));
    }

    @Test
    @Transactional
    @Order(2)
    @DisplayName("마일스톤 생성")
    void create() throws Exception {
        String url = "http://localhost:" + port + "/api/milestones";
        String title = "M4";
        LocalDate dueDate = LocalDate.of(2022, 05, 18);
        String description = "마일스톤 기능 목록";
        MilestoneDTO milestoneDTO = MilestoneDTO.builder()
                .title(title)
                .description(description)
                .dueDate(dueDate)
                .build();

        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());

        mockMvc.perform(post(url)
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJcImlzc3VlLXRyYWNrZXItdGVhbS0wNlwiIiwidXNlcklkIjoxfQ.WCMSnjyZCjZ80aSBN9GCNckS8Q_FkdpWXPWJwsx3kVA")
                .content(mapper.writeValueAsString(milestoneDTO)))
                .andExpect(status().isOk());

        Milestone milestone = milestoneRepository.findById(4L).get();
        softly.assertThat(milestone.getTitle()).isEqualTo(title);
        softly.assertThat(milestone.getDueDate()).isEqualTo(dueDate);
        softly.assertThat(milestone.getDescription()).isEqualTo(description);
        softly.assertThat(milestone.isOpen()).isTrue();
    }
}
