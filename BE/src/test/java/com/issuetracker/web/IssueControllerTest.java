package com.issuetracker.web;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.issuetracker.domain.issue.Issue;
import com.issuetracker.domain.issue.IssueRepository;
import com.issuetracker.exception.IssueNotFoundException;
import com.issuetracker.web.dto.reqeust.IssueRequestDTO;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class IssueControllerTest extends BaseControllerTest {

    @Autowired
    private IssueRepository issueRepository;

    @Test
    @Transactional
    @DisplayName("이슈 생성")
    void createIssue() throws Exception {
        String title = "이슈 4번";
        String comment = "이슈 4번 내용";
        List<Long> assignees = new ArrayList<>(Arrays.asList(1L, 2L));
        List<Long> labels = new ArrayList<>(Arrays.asList(1L, 2L));
        IssueRequestDTO issueRequest = new IssueRequestDTO(title, comment, assignees, labels, 1L);

        String url = "http://localhost:" + port + "/api/issues/form";
        mockMvc.perform(post(url)
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJcImlzc3VlLXRyYWNrZXItdGVhbS0wNlwiIiwidXNlcklkIjoxfQ.WCMSnjyZCjZ80aSBN9GCNckS8Q_FkdpWXPWJwsx3kVA")
                .content(new ObjectMapper().writeValueAsString(issueRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.issueId").value(4));

        Issue issue = issueRepository.findById(4L).orElseThrow(IssueNotFoundException::new);
        softly.assertThat(issue.getTitle()).isEqualTo(title);
        softly.assertThat(issue.getComments().get(0).getComment()).isEqualTo(comment);
        softly.assertThat(issue.getAssignees().get(1).getUserName()).isEqualTo("janeljs");
        softly.assertThat(issue.getLabels().get(0).getName()).isEqualTo("bug");
        softly.assertThat(issue.isOpen()).isTrue();
        softly.assertThat(issue.getAuthor().getName()).isEqualTo("Jeong InHo");
    }


    @Test
    @DisplayName("이슈 상세 페이지 조회")
    void getDetailPage() throws Exception {
        int issueId = 1;
        String url = "http://localhost:" + port + "/api/issues/" + issueId;
        mockMvc.perform(get(url)
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJcImlzc3VlLXRyYWNrZXItdGVhbS0wNlwiIiwidXNlcklkIjoxfQ.WCMSnjyZCjZ80aSBN9GCNckS8Q_FkdpWXPWJwsx3kVA"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("이슈 1번"))
                .andExpect(jsonPath("$.owner.name").value("Jeong InHo"))
                .andExpect(jsonPath("$.comments[0].comment").value("이슈 1번 내용"))
                .andExpect(jsonPath("$.assignees[1].userName").value("janeljs"))
                .andExpect(jsonPath("$.labels[1].name").value("feature"))
                .andExpect(jsonPath("$.milestone.title").value("M1"));
    }
}
